mod media_item;
use media_item::MediaItem;
use std::collections::hash_map::HashMap;

pub struct MediaServer {
  workspace: String,
  media: Vec<MediaItem>,
  tag_index: HashMap<String, Vec<u32>>
}

impl MediaServer {
  pub fn new()->MediaServer {
    MediaServer { 
      workspace: String::from(""), 
      media: Vec::new(), 
      tag_index: HashMap::new() 
    }
  }
}
