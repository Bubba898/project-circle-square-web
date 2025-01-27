export type ClientType = "web_client_ws" | "unity_client_ws"
export type State = "not_connected" | "waiting_for_other" | "game_started"

export type ItemType = "shield" | "bomb" | "zombie" | "enemy" 
export type EventType = "GameStart" | "PositionUpdate" | "ItemSpawn"

export type Position = {
  x: number
  y: number
}

export type PositionUpdatePayload = {
  player: Position
  zombies: Position[]
  bombs: Position[]
  enemies: Position[]
}

export type SpawnItemPayload = {
  position: Position
  item_type: ItemType
}

export type Message = {
  event: EventType
  payload?: MessagePayload
}

export type MessagePayload = PositionUpdatePayload | SpawnItemPayload

export type Payload = {
  SpawnItemPayload?: SpawnItemPayload
  PositionUpdatePayload?: PositionUpdatePayload
}

export type PositionMessage = {
  event: "PositionUpdate"
  payload: Payload
}

export type SpawnItemMessage = {
  payload: Payload
  event: "ItemSpawn"
}

export type ContextMenuItem = {
  item: ItemType,
  text: string,
  icon: string,
  amount: number,
  cooldown: number,
  time_to_next: number,
  color: string
}
