mod media_server;
mod app_state;

use app_state::AppState;
use tauri::Manager;
use tauri_plugin_cli::CliExt;

type MutableState = std::sync::Mutex<AppState>;

fn setup_workspace(app: &mut tauri::App) {
    let state = app.state::<MutableState>();

    match app.cli().matches() {
        Ok(matches) => {
            if let Some(workspace) = matches.args.get("workspace") {
                let path = workspace.value.as_str()
                    .expect("Misconfigured argument: <workspace> not a string")
                    .to_string();

                state.inner().lock().unwrap().create_server(path);
            }
        },
        Err(_) => ()
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(std::sync::Mutex::new(AppState::new()))
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_cli::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            setup_workspace(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
