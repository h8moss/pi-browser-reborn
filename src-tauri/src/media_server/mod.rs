mod media_item;
use std::path::PathBuf;

pub struct MediaServer {
    workspace:  PathBuf,
}

impl MediaServer {
    pub fn new(workspace: String) -> MediaServer {
        let server = MediaServer {
            workspace: PathBuf::from(workspace),
        };
        server.initialize();
        server
    }

    fn initialize(&self) {
        let db_path = self.workspace.join(".pi/data.db");

        match db_path.try_exists() {
            Ok(true) => (), // Do nothing
            _ => {
                // Create the db
                
            }
        }
    }
}
