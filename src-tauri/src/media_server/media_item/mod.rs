mod media_type;

use media_type::MediaType;

pub struct MediaItem {
    pub path: String,
    pub preview_path: String,
    pub favorite: bool,
    pub media_type: MediaType,
    pub added_time: u32,
    pub views: u32,
    pub tags: Vec<String>
}
