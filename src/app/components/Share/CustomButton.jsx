import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { colorTheme } from '../../constants/theme';

const ColorButton = styled(Button)((props) => ({
    color: props.variant === 'outlined' ? '#333' : props.fontcolor,
    background: props.variant === 'outlined' ? '#fff' : props.background,
    borderRadius: '2px',
    fontSize: '1.4rem',
    fontWeight: '600',
    outline: 0,
    '&:hover': {
        color: props.fontcolor,
        backgroundColor: props.hover,
        opacity: '2',
        borderColor:
            props.variant === 'outlined' ? props.background : props.hover,
    },
    textTransform: 'capitalize',
    borderColor: props.variant === 'outlined' ? props.background : '#fff',
}));

export default function CustomButton(props) {
    const {
        variant,
        startIcon,
        endIcon,
        title,
        disabled,
        size,
        fullWidth,
        colorButton,
        className,
        handleClick,
    } = props;

    return (
        <ColorButton
            className={className}
            variant={variant ? variant : 'contained'}
            background={
                colorButton
                    ? colorTheme[colorButton].background
                    : colorTheme['default'].background
            }
            hover={
                colorButton
                    ? colorTheme[colorButton].hover
                    : colorTheme['default'].hover
            }
            fontcolor={
                colorButton
                    ? colorTheme[colorButton].color
                    : colorTheme['default'].color
            }
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled ? disabled : false}
            size={size}
            fullWidth={fullWidth}
            onClick={handleClick ? handleClick : null}
        >
            {title}
        </ColorButton>
    );
}
