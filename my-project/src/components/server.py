import asyncio
import websockets
import json

game_state = {
    "turns": [],
    "active_player": "X",
    "game_over": False,
    "winner": None,
}

def check_win():
    board = [[None, None, None] for _ in range(3)]
    for turn in game_state["turns"]:
        row, col = turn["square"]["row"], turn["square"]["col"]
        board[row][col] = turn["player"]

    for row in board:
        if row[0] == row[1] == row[2] and row[0] is not None:
            return True

    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] is not None:
            return True

    if board[0][0] == board[1][1] == board[2][2] and board[0][0] is not None:
        return True

    if board[0][2] == board[1][1] == board[2][0] and board[0][2] is not None:
        return True

    return False

async def game_handler(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        action = data.get("action")

        if action == "new_turn":
            turn = data.get("turn")
            if game_state["game_over"]:
                continue

            game_state["turns"].append(turn)
            game_state["active_player"] = "O" if game_state["active_player"] == "X" else "X"

            if check_win():
                game_state["game_over"] = True
                game_state["winner"] = turn["player"]
            elif len(game_state["turns"]) == 9:
                game_state["game_over"] = True
                game_state["winner"] = "TIE"

            await websocket.send(json.dumps(game_state))

        elif action == "reset_game":
            game_state["turns"].clear()
            game_state["active_player"] = "X"
            game_state["game_over"] = False
            game_state["winner"] = None
            await websocket.send(json.dumps(game_state))

start_server = websockets.serve(game_handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
