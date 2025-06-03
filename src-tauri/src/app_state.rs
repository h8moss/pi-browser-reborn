use crate::media_server::MediaServer;

pub struct AppState {
  pub server: Option<MediaServer>
}

impl AppState 
{
  pub fn new()->AppState {
    AppState {
      server: Option::None
    }
  }
}