import type {ChangeEvent} from 'react';
import React, {useCallback} from 'react';
import {Checkbox} from '../Checkbox';
import {Spacing} from '../layout';
import {label, optionRow, rightRow} from './layout';
import {OptionExplainerBubble} from './OptionExplainerBubble';

export const MutedSetting: React.FC<{
	muted: boolean;
	setMuted: React.Dispatch<React.SetStateAction<boolean>>;
	enforceAudioTrack: boolean;
}> = ({muted, setMuted, enforceAudioTrack}) => {
	const onMutedChanged = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setMuted(e.target.checked);
		},
		[setMuted],
	);

	return (
		<div style={optionRow}>
			<div style={label}>
				Muted
				<Spacing x={0.5} />
				<OptionExplainerBubble id="muteOption" />
			</div>
			<Spacing x={0.25} />

			<div style={rightRow}>
				<Checkbox
					checked={muted}
					disabled={enforceAudioTrack && !muted}
					onChange={onMutedChanged}
					name="muted"
				/>
			</div>
		</div>
	);
};
