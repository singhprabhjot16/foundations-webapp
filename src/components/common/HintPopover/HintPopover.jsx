import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions, Typography, Button, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

/**
 * HintPopover - Modal displaying hint text for vocabulary questions
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {string|null} props.hintText - Hint content
 * @param {number} props.hintsRemaining - Remaining hints
 * @param {Function} props.onClose - Close handler
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const HintPopover = ({ open, hintText, hintsRemaining, onClose, sx = {} }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          mx: 2,
          ...sx,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightbulbIcon sx={{ color: theme.palette.warning.main, fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Hint
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" aria-label="close hint">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}
        >
          {hintText || 'No hint available for this question.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mr: 'auto' }}>
          Hints remaining: {hintsRemaining}
        </Typography>
        <Button onClick={onClose} variant="outlined" size="small">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

HintPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  hintText: PropTypes.string,
  hintsRemaining: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default HintPopover;
