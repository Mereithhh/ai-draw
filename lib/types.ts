export interface NodeInfo {
    class_type: string;
    inputs: {
      [key: string]: any;
    };
  }
  
  export interface Prompt {
    [nodeId: string]: {
      
      inputs: Record<string, any>;
      class_type: string;
    };
  }
  
  export interface ComfyUIError {
    type: string;
    message: string;
    details: string;
    
    extra_info: any;
  }
  
  export interface QueuePromptResult {
    prompt_id: string;
    number: number;
    node_errors: Record<string, ComfyUIError>;
  }
  
  export interface UploadImageResult {
    name: string;
    subfolder: string;
    type: string;
  }
  
  export interface ImageRef {
    filename: string;
    subfolder?: string;
    type?: string;
  }
  
  export interface EditHistoryRequest {
    clear?: boolean;
    delete?: string[];
  }
  
  export interface PromptHistory {
    
    prompt: any[];
    
    outputs: Record<string, any>;
  }
  
  export interface HistoryResult {
    [clientId: string]: PromptHistory;
  }
  
  export interface OutputImage {
    filename: string;
    subfolder: string;
    type: string;
  }
  
  export interface ImageContainer {
    blob: Blob;
    image: OutputImage;
  }
  
  export interface ImagesResponse {
    [nodeId: string]: ImageContainer[];
  }
  
  export interface DeviceStats {
    name: string;
    type: string;
    index: number;
    vram_total: number;
    vram_free: number;
    torch_vram_total: number;
    torch_vram_free: number;
  }
  
  export interface SystemStatsResponse {
    devices: DeviceStats[];
  }
  
  export interface ViewMetadataResponse {
    
    [key: string]: any;
  }
  
  export type QueueDataPrimitives = number | string | object;
  export type QueueData = QueueDataPrimitives | Array<QueueDataPrimitives>;
  
  export interface QueueResponse {
    queue_running: QueueData[];
    queue_pending: QueueData[];
  }
  
  export interface ExecInfo {
    queue_remaining: number;
  }
  
  export interface PromptQueueResponse {
    exec_info: ExecInfo;
  }
  
  export interface ObjectInfo {
    input: {
      
      [key: string]: any;
    };
    output: string[];
    output_is_list: boolean[];
    output_name: string[];
    name: string;
    display_name: string;
    description: string;
    category: string;
    output_node: boolean;
  }
  
  export interface ObjectInfoResponse {
    [nodeClass: string]: ObjectInfo;
  }
  
  export interface ResponseError {
    error: string | ComfyUIError;
    node_errors: Record<string, ComfyUIError>;
  }
  
  // Taken from https://github.com/comfyanonymous/ComfyUI/blob/master/folder_paths.py
  export type FolderName =
    | 'checkpoints'
    | 'configs'
    | 'loras'
    | 'vae'
    | 'clip'
    | 'unet'
    | 'clip_vision'
    | 'style_models'
    | 'embeddings'
    | 'diffusers'
    | 'vae_approx'
    | 'controlnet'
    | 'gligen'
    | 'upscale_models'
    | 'custom_nodes'
    | 'hypernetworks';