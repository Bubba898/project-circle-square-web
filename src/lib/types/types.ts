export type ClientType = "web_client_ws" | "unity_client_ws"
export type State = "not_connected" | "waiting_for_other" | "game_started"

export type ItemType = "shield" | "bomb"
export type EventType = "GameStart" | "PositionUpdate" | "ItemSpawn"

export type Position = {
  x: number
  y: number
}

export type PositionUpdatePayload = {
  player: Position
}

export type SpawnItemPayload = {
  position: Position
  item_type: ItemType
}

export type MessagePayload = PositionUpdatePayload | SpawnItemPayload

export type PositionMessage = {
  event: "PositionUpdate"
  PositionUpdatePayload: PositionUpdatePayload
}

export type Message = {
  event: EventType
  payload?: MessagePayload
}

export type SpawnItemMessage = {
  SpawnItemPayload: SpawnItemPayload
  event: "ItemSpawn"
}
