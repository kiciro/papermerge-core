export type State<T> = {
  is_loading: boolean
  error: string | null
  data: T | null
}
export type DefaultHeaderType = Record<string, string>

export type OcrStatusEnum =
  | "UNKNOWN"
  | "RECEIVED"
  | "STARTED"
  | "SUCCESS"
  | "FAILURE"

export type CType = "folder" | "document"

export type CurrentNodeType = {
  id: string
  ctype: CType
  breadcrumb: Array<[string, string]> | null | undefined
}

export type CreateUser = {
  username: string
  email: string
  is_superuser: boolean
  is_active: boolean
  group_ids: string[]
}

export type NewUser = {
  username: string
  email: string
  home_folder_id: string
  inbox_folder_id: string
  scopes: Array<string>
}

export type User = NewUser & {
  id: string
}

export type UserDetails = User & {
  groups: Group[]
  scopes: string[]
  is_superuser: boolean
  is_active: boolean
}

export type UserEditableFields = {
  username: string
  email: string
  is_superuser: boolean
  is_active: boolean
  groups: string[]
}

export type UserUpdate = {
  id: string
  username: string
  email: string
  is_superuser: boolean
  is_active: boolean
  group_ids: string[]
}

export type ChangePassword = {
  userId: string
  password: string
}

export type UserFields = UserEditableFields & {
  id: string
}

export type SliceStateStatus = "idle" | "loading" | "succeeded" | "failed"
export type SliceStateError = undefined | string | null

export type SliceState<T> = {
  data: null | T
  status: SliceStateStatus
  error: SliceStateError
}

export type NewColoredTag = {
  name: string
  bg_color: string
  fg_color: string
  pinned: boolean
  description: string
}

export type ColoredTagUpdate = Pick<
  ColoredTag,
  "id" | "name" | "bg_color" | "fg_color" | "description" | "pinned"
>

export type ColoredTag = NewColoredTag & {
  id: string
}

export type ColoredTagType = {
  id: string
  name: string
  bg_color: string
  fg_color: string
  pinned: boolean
  description: string
}

export type NType = {
  /* Short version of the Node Type */
  id: string
  ctype: CType
}

export type NodeType = NType & {
  /* Full version of Node Type */
  tags: ColoredTagType[]
  accept_dropped_nodes: boolean
  is_currently_dragged: boolean
  parent_id: string | null
  title: string
  user_id: string
  update_at: string
  ocr_status: OcrStatusEnum
  ocr: boolean
  thumbnail_url: string | null
  breadcrumb: Array<[string, string]>
}

export type BreadcrumbItemType = [string, string]

export type BreadcrumbType = Array<BreadcrumbItemType>

export type FolderType = NodeType & {
  breadcrumb: BreadcrumbType
}

export type NodeSortFieldEnum = "title" | "ctype" | "created_at" | "updated_at"

export type NodeSortOrderEnum = "asc" | "desc"

export type Pagination = {
  page_number: number
  per_page: number
}

export type PaginationType = {
  numPages: number
  pageNumber: number
  pageSize: number
}

export type Sorting = {
  sort_field: NodeSortFieldEnum
  sort_order: NodeSortOrderEnum
}

export interface EditEntityTitle {
  id: string
  title: string
}

export type Paginated<T> = {
  page_size: number
  page_number: number
  num_pages: number
  items: Array<T>
}

export type NodeLoaderResponseType = {
  nodes: Array<NodeType>
  parent: FolderType
  breadcrumb: BreadcrumbType
  per_page: number
  num_pages: number
  page_number: number
}

export type OCRLangType = {
  [key: string]: string
}

export type PanelMode = "main" | "secondary"
export type PanelType = "main" | "secondary"

export type NewGroup = {
  name: string
  scopes: Array<string>
}

export type Group = NewGroup & {
  id: string
}

export type GroupDetails = {
  id: string
  name: string
  scopes: Array<string>
}

export type GroupUpdate = Pick<Group, "id" | "name" | "scopes">

export type FileItemStatus = "uploading" | "success" | "failure"

export type FileItemType = {
  status: FileItemStatus
  error: string | null
  file_name: string
  source: NodeType | null
  target: FolderType
}

export type OCRCode =
  | "ces"
  | "dan"
  | "deu"
  | "ell"
  | "eng"
  | "fin"
  | "fra"
  | "guj"
  | "heb"
  | "hin"
  | "ita"
  | "jpn"
  | "kor"
  | "lit"
  | "nld"
  | "nor"
  | "osd"
  | "pol"
  | "por"
  | "ron"
  | "san"
  | "spa"

export type PageType = {
  id: string
  document_version_id: string
  jpg_url: string | null
  svg_url: string | null
  lang: string
  number: number
  text: string
}

// page and rotation operation
export type PageAndRotOp = {
  page: PageType
  angle: number // rotation degree, can be positive or negative
}

export type DocumentVersion = {
  id: string
  document_id: string
  download_url: string
  file_name: string
  lang: OCRCode
  number: number
  page_count: number
  pages: Array<PageType>
  short_description: string
  size: number
}

export type DocumentVersionWithPageRot = {
  id: string
  document_id: string
  download_url: string
  file_name: string
  lang: OCRCode
  number: number
  page_count: number
  pages: Array<PageAndRotOp>
  short_description: string
  size: number
}

export type DocumentType = {
  id: string
  ctype: "document"
  title: string
  breadcrumb: BreadcrumbType
  ocr: boolean
  ocr_status: OcrStatusEnum
  thumbnail_url: string
  versions: Array<DocumentVersion>
  parent_id: string | null
  user_id: string
  updated_at: string
}

export interface ClientPage {
  id: string
  angle: number
  /* Page number as it came from the server*/
  number: number
}

export interface ClientDocumentVersion {
  id: string
  lang: OCRCode
  number: number
  page_count: number
  short_description: string
  size: number
  pages: Array<ClientPage>
  /* Page array in same order as received from server side.
  Also angle here is set to 0. `initial_pages` attribute
  is used to restore `pages` attribute to their initial value  */
  initial_pages: Array<ClientPage>
}

export type NodeTag = {
  name: string
  bg_color: string
  fg_color: string
}

export type SearchResultNode = {
  id: string
  title: string
  entity_type: CType
  lang: string | null
  page_number: number | null
  document_id: string | null
  breadcrumb: Array<[string, string]> | null | undefined
  tags: Array<NodeTag>
}

export type PaginatedSearchResult = {
  num_pages: number
  page_number: number
  page_size: number
  items: Array<SearchResultNode>
  query: string
}

export type DroppedThumbnailPosition = "before" | "after"
export type ThumbnailPageDroppedArgs = {
  sources: PageType[]
  target: PageType
  position: DroppedThumbnailPosition
}

export type BooleanString = "true" | "false"

export type PaginatedArgs = {
  page_number?: number
  page_size?: number
}

export type Coord = {
  x: number
  y: number
}
