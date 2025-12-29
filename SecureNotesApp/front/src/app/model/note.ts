export interface Note{
  id : number,
  owner_id?: number,
  title : string,
  content ?: string
  user_can_edit ?: boolean
  version ?: number,
}
