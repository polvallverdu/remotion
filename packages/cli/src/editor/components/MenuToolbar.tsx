import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';
import {FONT_FAMILY} from '../helpers/font';
import {setGlobalMenuId} from '../state/global-menu-id';
import {
	isClickInsideMenuStructure,
	MENU_ITEMS_CONTAINER,
} from './Menu/is-menu-click';
import {Menu, MenuId, MenuItem} from './Menu/MenuItem';

const row: React.CSSProperties = {
	alignItems: 'center',
	flexDirection: 'row',
	display: 'flex',
	color: 'white',
	borderBottom: '1px solid black',

	fontFamily: FONT_FAMILY,
	fontSize: 13,
	paddingLeft: 6,
};

type Structure = Menu[];

const openExternal = (link: string) => {
	window.open(link, '_blank');
};

export const MenuToolbar: React.FC = () => {
	const [selected, setSelected] = useState<MenuId | null>(null);

	useLayoutEffect(() => {
		setGlobalMenuId(selected);
	}, [selected]);

	const itemClicked = useCallback(
		(itemId: MenuId) => {
			setSelected(itemId);
		},
		[setSelected]
	);

	const itemHovered = useCallback(
		(itemId: MenuId) => {
			if (selected) {
				setSelected(itemId);
			}
		},
		[selected, setSelected]
	);

	const close = useCallback(() => {
		setSelected(null);
	}, []);

	const structure = useMemo((): Structure => {
		return [
			{
				id: 'remotion',
				label: 'Remotion',
				items: [
					{
						id: 'about',
						label: 'About Remotion',
						onClick: () => {
							close();
							openExternal('https://remotion.dev');
						},
						type: 'item',
					},
					{
						id: 'changelog',
						label: 'Changelog',
						onClick: () => {
							close();
							openExternal('https://github.com/remotion-dev/remotion/releases');
						},
						type: 'item',
					},
					{
						id: 'license',
						label: 'License',
						onClick: () => {
							close();
							openExternal(
								'https://github.com/remotion-dev/remotion/blob/main/LICENSE.md'
							);
						},
						type: 'item',
					},
				],
			},
			{
				id: 'file',
				label: 'File',
				items: [
					{
						id: 'new-sequence',
						label: 'New sequence',
						onClick: () => {
							close();
							// eslint-disable-next-line no-alert
							alert('todo');
						},
						type: 'item',
					},
					{
						id: 'new-still',
						label: 'New still',
						onClick: () => {
							close();
							// eslint-disable-next-line no-alert
							alert('todo');
						},
						type: 'item',
					},
					{
						id: 'render',
						label: 'Render',
						onClick: () => {
							close();
							// eslint-disable-next-line no-alert
							alert('todo');
						},
						type: 'item',
					},
				],
			},
			{
				id: 'help',
				label: 'Help',
				items: [
					{
						id: 'docs',
						label: 'Docs',
						onClick: () => {
							close();
							openExternal('https://remotion.dev/docs');
						},
						type: 'item',
					},
					{
						id: 'file-issue',
						label: 'File an issue',
						onClick: () => {
							close();
							openExternal(
								'https://github.com/remotion-dev/remotion/issues/new/choose'
							);
						},
						type: 'item',
					},
					{
						id: 'discord',
						label: 'Join Discord community',
						onClick: () => {
							close();
							openExternal('https://discord.com/invite/6VzzNDwUwV');
						},
						type: 'item',
					},
					{
						id: 'help-divider',
						type: 'divider',
					},
					{
						id: 'insta',
						label: 'Instagram',
						onClick: () => {
							close();
							openExternal('https://instagram.com/remotion.dev');
						},
						type: 'item',
					},
					{
						id: 'twitter',
						label: 'Twitter',
						onClick: () => {
							close();
							openExternal('https://twitter.com/JNYBGR');
						},
						type: 'item',
					},
					{
						id: 'tiktok',
						label: 'TikTok',
						onClick: () => {
							close();
							openExternal('https://www.tiktok.com/@remotion.dev');
						},
						type: 'item',
					},
				],
			},
		];
	}, [close]);

	const menus = useMemo(() => {
		return structure.map((s) => s.id);
	}, [structure]);

	const onKeyPress = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				setSelected((s) => {
					if (s === null) {
						return null;
					}

					return menus[(menus.indexOf(s) + 1) % menus.length];
				});
			}

			if (e.key === 'ArrowLeft') {
				setSelected((s) => {
					if (s === null) {
						return null;
					}

					if (menus.indexOf(s) === 0) {
						return menus[menus.length - 1];
					}

					return menus[(menus.indexOf(s) - 1) % menus.length];
				});
			}

			if (e.key === 'Escape') {
				setSelected(null);
				(document.activeElement as HTMLElement).blur();
			}
		},
		[menus]
	);

	const onPointerDown: EventListenerOrEventListenerObject = useCallback(
		(e) => {
			const {target} = e;
			if (selected === null || !target) {
				return;
			}

			if (isClickInsideMenuStructure(target as HTMLElement)) {
				return;
			}

			setSelected(null);
		},
		[selected]
	);

	useEffect(() => {
		if (selected === null) {
			return;
		}

		window.addEventListener('keydown', onKeyPress);
		window.addEventListener('pointerdown', onPointerDown);
		return () => {
			window.removeEventListener('keydown', onKeyPress);
			window.removeEventListener('pointerdown', onPointerDown);
		};
	}, [onKeyPress, onPointerDown, selected]);

	const onKeyboardUnfocused = useCallback(() => {
		setSelected(null);
	}, [setSelected]);

	const onItemFocused = useCallback(
		(item: MenuId) => {
			setSelected(item);
		},
		[setSelected]
	);

	const onKeyboardTabEndReached = useCallback(() => {
		setSelected(null);
	}, []);

	return (
		<div style={row}>
			<div className={MENU_ITEMS_CONTAINER}>
				{structure.map((s) => {
					return (
						<MenuItem
							key={s.id}
							selected={selected === s.id}
							onItemSelected={itemClicked}
							onItemHovered={itemHovered}
							id={s.id}
							label={s.label}
							onItemFocused={onItemFocused}
							onItemQuit={onKeyboardUnfocused}
							menu={s}
						/>
					);
				})}
			</div>
			{selected === null ? null : (
				// If this element gets focused, the user has tabbed through all menus,
				// unfocusing the menu
				<div tabIndex={0} onFocus={onKeyboardTabEndReached} />
			)}
		</div>
	);
};
