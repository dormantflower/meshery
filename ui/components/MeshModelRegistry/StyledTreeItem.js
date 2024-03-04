import React, { useState } from 'react';
import { Box, Typography, useTheme, Checkbox } from '@material-ui/core';
import SearchBar from '@/utils/custom-search';
import debounce from '@/utils/debounce';
import { StyledTreeItemRoot } from './MeshModel.style';
import { useWindowDimensions } from '@/utils/dimension';
import { Colors } from '@/themes/app';

/**
 * Customized item component in mui-x-tree
 */
const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const [checked, setChecked] = useState(false);
  const [hover, setHover] = useState(false);
  const { labelText, root, search, setSearchText, check, ...other } = props;
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <StyledTreeItemRoot
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      root={root}
      lineColor={theme.palette.secondary.text}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
            px: 0,
          }}
        >
          {width < 1370 && isSearchExpanded ? null : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant={'body'} style={{ color: `${root}` }}>
                {labelText}
              </Typography>
            </div>
          )}

          {check && (
            <Checkbox
              onClick={(e) => {
                e.stopPropagation();
                setChecked((prevcheck) => !prevcheck);
              }}
              size="small"
              checked={checked}
              style={{
                visibility: hover || checked ? 'visible' : 'hidden',
                color: Colors.keppelGreen,
                padding: '0',
                '&.Mui-checked': {
                  color: Colors.keppelGreen,
                },
              }}
            />
          )}
          {search && (
            <SearchBar
              onSearch={debounce((value) => setSearchText(value), 200)}
              expanded={isSearchExpanded}
              setExpanded={setIsSearchExpanded}
              placeholder="Search"
            />
          )}
        </Box>
      }
      {...other}
      ref={ref}
    />
  );
});

export default StyledTreeItem;
