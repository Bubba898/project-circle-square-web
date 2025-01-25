export type ClientType = "web_client_ws" | "unity_client_ws"
export type State = "not_connected" | "waiting_for_other" | "game_started"
export type EventType = "GameStart"
export type ItemType = "shield" | "bomb"

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

export type MessagePayload = PositionUpdatePayload | SpawnItemPayload

export type Message = {
  event: EventType
  payload?: MessagePayload
}
