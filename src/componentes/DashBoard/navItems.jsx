import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

export const NavItems = ({ open }) => {
	return (
		<List>
			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
				<ListItem key={text} disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							{index % 2 === 0 ? (
								<AiOutlineMenuUnfold />
							) : (
								<AiOutlineMenuUnfold />
							)}
						</ListItemIcon>
						<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
