mod media_item;
use media_item::MediaItem;
use std::collections::hash_map::HashMap;

pub struct MediaServer {
  workspace: String,
}

impl MediaServer {
  pub fn new(workspace: String)->MediaServer {
    MediaServer { 
      workspace: workspace, 
    }
  }
}
