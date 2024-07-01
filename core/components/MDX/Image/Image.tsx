import { Box, Flex, Text } from '@maximeheckel/design-system';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { Content, Overlay, Trigger } from './Lightbox';

interface ImageProps extends NextImageProps {
  border?: boolean;
}

const Image = (props: ImageProps) => {
  const { border = false, ...rest } = props;

  return (
    <Dialog.Root>
      <Flex
        as="figure"
        direction="column"
        css={{ 
          margin: '0', 
          width: '100%',
          alignItems: 'center', // Center children horizontally
        }}
      >
        <Trigger tabIndex={0}>
          <Box
            css={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Box
              as={NextImage}
              css={{
                borderRadius: 'var(--border-radius-3)',
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
              {...rest}
              style={{
                border: border
                  ? '3px solid oklch(from var(--gray-500) l c h / 70%)'
                  : 'none',
              }}
            />
          </Box>
        </Trigger>
        <Text
          as="figcaption"
          css={{
            lineHeight: '1.5',
            paddingTop: '10px',
            textAlign: 'center',
            width: '100%',
          }}
          size="1"
          variant="tertiary"
          weight="3"
        >
          {props.alt}
        </Text>
      </Flex>
      <Dialog.Portal>
        <Overlay>
          <Content>
            <Dialog.Close asChild>
              <Box
                as={NextImage}
                css={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 'var(--border-radius-3)',
                }}
                {...props}
              />
            </Dialog.Close>
          </Content>
        </Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Image;