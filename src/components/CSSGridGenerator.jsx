import { GridSetupPanel } from './GridSetupPanel';
import { PlacedItemsOverlay } from './PlacedItemsOverlay';
import { ColumnTrackInputs } from './TrackSizeInputs';
import { VisualGrid } from './VisualGrid';

export default function CSSGridGenerator() {
  return (
    <div>
      <GridSetupPanel />
      <ColumnTrackInputs />
      <PlacedItemsOverlay />
      <VisualGrid />
    </div>
  );
}
