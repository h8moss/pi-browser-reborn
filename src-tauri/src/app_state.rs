use crate::media_server::MediaServer;

pub struct AppState {
  pub server: Option<MediaServer>
}

impl AppState 
{
  pub fn new()->Self {
    AppState {
      server: Option::None
    }
  }

  pub fn create_server(&mut self, workspace: String) {
    self.server = Some(MediaServer::new(workspace));
  }
}