import { GridSetupPanel } from './GridSetupPanel';
import { PlacedItemsOverlay } from './PlacedItemsOverlay';
import { ColumnTrackInputs } from './TrackSizeInputs';

export default function CSSGridGenerator() {
  return (
    <div>
      <GridSetupPanel />
      <ColumnTrackInputs />
      <PlacedItemsOverlay />
    </div>
  );
}
