import React, { useState } from 'react'
import { Box, Typography, IconButton, Stack } from '@mui/material'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

export default function CExpansionPanel(props) {
  const {
    cvariant = 'primary',
    title,
    titleStyle = {},
    subtitle,
    subtitleStyle = {},
    content,
    contentStyle = {},
    sx = {},
    style = {},
    defaultExpanded = false,
    expandable = true,
    onExpand,
    onCollapse,
    ...baseProps
  } = props

  const [expanded, setExpanded] = useState(defaultExpanded)
  const expansionStyle = { ...sx, ...style }
  
  let variantStyle = {}
  
  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--p-b-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
      break
    default: // primary
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--p-b-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
  }

  const handleToggle = () => {
    if (!expandable) return
    const newExpanded = !expanded
    setExpanded(newExpanded)
    if (newExpanded && onExpand) {
      onExpand()
    } else if (!newExpanded && onCollapse) {
      onCollapse()
    }
  }

  return (
    <Box
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        ...variantStyle,
        ...expansionStyle
      }}
      {...baseProps}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '16px',
          cursor: expandable ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'var(--t-bg-color)'
          }
        }}
        onClick={handleToggle}
      >
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          sx={{ flex: 1 }}
        >
          {title && (
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--p-fg-color)',
                ...titleStyle
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: '400',
                color: 'var(--s-fg-color)',
                mt: '2px',
                ...subtitleStyle
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
        {expandable && (
          <IconButton
            sx={{
              width: '32px',
              height: '32px',
              p: '6px',
              rotate: expanded ? '180deg' : '0deg',
              transition: 'rotate 0.3s ease',
              '&:hover': {
                bgcolor: 'var(--t-bg-color)'
              }
            }}
          >
            <ExpandMoreRoundedIcon
              sx={{
                width: '16px',
                height: '16px',
                color: 'var(--p-fg-color)'
              }}
            />
          </IconButton>
        )}
      </Box>
      {expanded && (
        <Box
          sx={{
            p: '0 16px 16px 16px',
            borderTops: '1px solid var(--p-b-color)',
            ...contentStyle
          }}
        >
          {content}
        </Box>
      )}
    </Box>
  )
}