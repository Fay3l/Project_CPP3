from api import app,List,WebSocket,ConnectionSql,json,WebSocketDisconnect
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.sql = ConnectionSql.sql.SQL()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()
            
@app.websocket("/products")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            json_data = json.loads(data)
            id = json_data.get("id")
            name = json_data.get("name")
            price = json_data.get("price")
            if "Edit" == json_data.get("message"):
                await manager.broadcast(manager.sql.update_product(id,name,price))
            elif "Remove" == json_data.get("message"):
                await manager.broadcast(manager.sql.delete_product(id))
            elif "Send" == json_data.get("message"):
                await manager.broadcast(manager.sql.commit_product(name,price))
            else:
                await manager.broadcast(manager.sql.get_user())
    except WebSocketDisconnect:
        manager.disconnect(websocket)

#Server Send Events
# def get_message():
#     text = sql.get_products()
#     return text
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