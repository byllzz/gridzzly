import { CodePanel } from './CodePanel';
import { GridSetupPanel } from './GridSetupPanel';
import { PlacedItemsOverlay } from './PlacedItemsOverlay';
import { TemplatePresets } from './TemplatePresets';
import { ColumnTrackInputs } from './TrackSizeInputs';
import { VisualGrid } from './VisualGrid';

export default function CSSGridGenerator() {
  return (
    <div>
      <GridSetupPanel />
      <ColumnTrackInputs />
      <PlacedItemsOverlay />
      <VisualGrid />
      <TemplatePresets />
      <CodePanel />
    </div>
  );
}
