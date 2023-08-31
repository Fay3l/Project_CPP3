import logging
import re
from typing import List
import sql
from pydantic import BaseModel
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder

logger = logging.getLogger()

# MESSAGE_STREAM_DELAY = 2  # second
# MESSAGE_STREAM_RETRY_TIMEOUT = 15000  # milisecond
app = FastAPI()


class Login(BaseModel):
    username:str
    password:str


test_user = {
   "username": "user",
   "password": "user",
}

# add CORS so our web page can connect to our api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.sql = sql.SQL()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

def get_message():
    text = sql.get_products()
    return text

manager = ConnectionManager()

@app.post("/login")
async def create_login(login:Login):
    data = jsonable_encoder(login)
    if(data["username"]==test_user["username"] and data["password"]== test_user["password"]):
        return True
    else:
        return False

@app.websocket("/products")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if "Edit" in data:
                res = re.findall(r'\w+', data)
                res_d = re.findall(r'\d+\.\d+', data)
                if res_d:
                    await manager.broadcast(f"{manager.sql.update_product(res[1],res[2],res_d[0])}")
                else:
                    await manager.broadcast(f"{manager.sql.update_product(res[1],res[2],res[3])}")
            elif "Remove" in data:
                res = re.findall(r'\w+', data)
                await manager.broadcast(f"{manager.sql.delete_product(res[1])}")
            elif "Send" in data:
                res = re.findall(r'\w+', data)
                res_d = re.findall(r'\d+\.\d+', data)
                if res_d:
                    await manager.broadcast(f"{manager.sql.commit(res[1],res_d[0])}")
                else:
                    await manager.broadcast(f"{manager.sql.commit(res[1],res[2])}")
            else:
                await manager.broadcast(sql.get_products())
    except WebSocketDisconnect:
        manager.disconnect(websocket)

#Server Send Events
# @app.get("/stream")
# async def message_stream(request: Request):
#     async def event_generator():
#         while True:
#             if await request.is_disconnected():
#                 logger.debug("Request disconnected")
#                 break
#             message= get_message()
#             if message:
#                 yield {
#                     "data":f"{message}" ,
#                 }
#             else:
#                 yield {
#                     "data": "End of the stream",
#                 }

#             # await asyncio.sleep(MESSAGE_STREAM_DELAY)

#     return EventSourceResponse(event_generator())