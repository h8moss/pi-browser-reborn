mod media_type;

use media_type::MediaType;

pub struct MediaItem {
    path: String,
    preview_path: String,
    favorite: bool,
    media_type: MediaType,
    added_time: u32,
    views: u32,
    tags: Vec<String>
}
