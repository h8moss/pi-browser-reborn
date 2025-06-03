import { check, Update } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { PropsWithChildren, useEffect } from 'react';
import UpdaterState from './updaterState';
import useMultiState from '../../util/useMultiState';

interface Props { }

type State = {
  updaterState: UpdaterState,
  update: Update | null,
  updateProgress: number,
  updateTotal: number,
};

const Updater = ({ children }: PropsWithChildren<Props>) => {
  const [{ updaterState, update, updateProgress, updateTotal }, setState] = useMultiState<State>({
    updaterState: UpdaterState.Checking,
    update: null,
    updateProgress: 0,
    updateTotal: 0,
  });

  useEffect(() => {
    if (updaterState == UpdaterState.Checking) {
      (async () => {
        const upd = await check();
        if (upd) {
          setState({
            update: upd,
            updaterState: UpdaterState.FoundUpdate
          });
        } else {
          setState({
            update: upd,
            updaterState: UpdaterState.NoUpdate
          });
        }
      })();
    }
  }, [updaterState]);

  const performUpdate = () => {
    setState({ updaterState: UpdaterState.Updating });
    update?.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          setState({ updateTotal: event.data.contentLength || 0 });
          break;
        case 'Progress':
          setState((p) => ({
            updateProgress: p.updateProgress + event.data.chunkLength
          }));
          break;
        case 'Finished':
          setState({ updaterState: UpdaterState.DoneUpdating });
          break;
      }
    });
  }

  if (updaterState == UpdaterState.Checking) {
    return CheckingState();
  } else if (updaterState == UpdaterState.Updating) {
    return UpdatingState({
      v: updateProgress,
      max: updateTotal
    });
  } else if (updaterState == UpdaterState.NoUpdate) {
    return (<>{children}</>)
  } else if (updaterState == UpdaterState.FoundUpdate) {
    return FoundUpdateState({
      onYes: performUpdate,
      onNo: () => setState({ updaterState: UpdaterState.NoUpdate })
    });
  } else if (updaterState == UpdaterState.DoneUpdating) {
    return DoneUpdatingState({
      onOk: async () => {
        await relaunch();
      }
    });
  } else {
    throw "Updater State not implemented - contact developer";
  }
}

const CheckingState = () => {
  return (<p>...</p>);
}

const UpdatingState = (p: { v: number, max: number }) => {
  return (<progress value={p.v} max={p.max} />);
}

const FoundUpdateState = (p: { onYes: () => unknown, onNo: () => unknown }) => {
  return (
    <div>
      <p>Found an update! Would you like to install it?</p>
      <button onClick={p.onYes}>Yes</button>
      <button onClick={p.onNo}>No</button>
    </div >);
}

const DoneUpdatingState = (p: { onOk: () => unknown }) => {
  return (
    <div>
      <p>Downloaded new update! Application will restart</p>
      <button onClick={p.onOk}>ok</button>
    </div>);
}

export default Updater;
