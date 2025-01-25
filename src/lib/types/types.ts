export type ClientType = "web_client_ws" | "unity_client_ws"
export type State = "not_connected" | "waiting_for_other" | "game_started"

export type ItemType = "shield" | "bomb"
export type EventType = "GameStart" | "PositionUpdate" | "ItemSpawn"

export type Position = {
  x: number
  y: number
}

export type PositionUpdatePayload = {
  player_1 : Position
  player_2: Position
}

export type SpawnItemPayload = {
  position: Position
  item_type: ItemType
}

export type SpawnItemMessage = {
  payload: SpawnItemPayload
  event: "ItemSpawn"
}


export type MessagePayload = PositionUpdatePayload | SpawnItemPayload

export type PositionMessage = {
  event: "PositionUpdate"
  payload: PositionUpdatePayload
}

export type Message = {
  event: EventType
  payload?: MessagePayload
}
