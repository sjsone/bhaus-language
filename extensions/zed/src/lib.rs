use std::sync::OnceLock;
use zed_extension_api::{self as zed, Command, Extension, LanguageServerId, Result};

static LANGUAGE_SERVER_ID: OnceLock<LanguageServerId> = OnceLock::new();

struct BhausExtension;

impl Extension for BhausExtension {
    fn new() -> Self {
        BhausExtension
    }

    fn language_server_command(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<Command> {
        let _id = LANGUAGE_SERVER_ID.get_or_init(|| language_server_id.clone());

        // Write the log into the root of the project currently being edited, so
        // it's easy to find (and tail) while developing the language server.
        let log_path = format!("{}/.bhaus-ls.log", worktree.root_path());

        Ok(Command {
            command: "/Users/simon/devel/bhaus_project/bhaus-util/bin/bhaus-cli"
                .to_string(),
            args: vec![
                "ls".to_string(),
                "--log-file".to_string(),
                log_path,
                "--log-verbosity".to_string(),
                "2".to_string(),
            ],
            env: vec![],
        })
    }
}

zed::register_extension!(BhausExtension);
