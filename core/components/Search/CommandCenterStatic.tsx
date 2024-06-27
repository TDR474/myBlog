import { css, Flex, Text, Pill } from '@maximeheckel/design-system';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { MAX_HEIGHT } from './constants';
import { Sparkles } from './Icons';
import * as S from './Search.styles';
import useIndexItem from './useIndexItem';

const commandCenterStaticWrapper = css({
  maxHeight: `${MAX_HEIGHT}px`,
  overflowY: 'auto',
  padding: '0 8px',
});

const items = ['aimode-tools'];

interface CommandCenterStaticProps {
  collapse: boolean;
  onItemClick: (item: string) => void;
}

const CommandCenterStatic = (props: CommandCenterStaticProps) => {
  const { collapse, onItemClick } = props;
  const [hidden, setHidden] = useState(false);

  const [selectedResult, previousResult, nextResult] = useIndexItem(items);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          (document.getElementById(selectedResult)
            ?.children[0] as HTMLElement).click();
          break;
        case 'ArrowUp':
          event.preventDefault();
          previousResult();
          break;
        case 'ArrowDown':
          event.preventDefault();
          nextResult();
          break;
        default:
      }
    },
    [previousResult, nextResult, selectedResult]
  );

  useEffect(() => {
    if (selectedResult) {
      document
        .getElementById(selectedResult)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedResult]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    if (collapse) {
      setTimeout(() => {
        setHidden(true);
      }, 500);
    } else {
      setHidden(false);
    }
  }, [collapse]);

  return (
    <motion.div
      initial={false}
      animate={{
        height: collapse ? 0 : 468,
      }}
      transition={{ ease: 'easeInOut' }}
      style={{
        backgroundColor: 'var(--background)',
        borderBottomLeftRadius: 'var(--border-radius-2)',
        borderBottomRightRadius: 'var(--border-radius-2)',
        overflow: 'hidden',
        border: collapse ? 'none' : '1px solid var(--border-color)',
      }}
    >
      <div aria-hidden={hidden} className={commandCenterStaticWrapper()}>
        <S.Separator>Tools</S.Separator>
        <S.Item
          data-testid="aimode"
          data-selected={selectedResult === 'aimode-tools'}
          id="aimode-tools"
          key="aimode-tools"
        >
          <Flex
            as="button"
            css={{ cursor: 'pointer' }}
            data-testid="aimode-button"
            onClick={() => {
              onItemClick('aiMode');
            }}
          >
            <Sparkles />
            <Text
              as="span"
              css={{ margin: '0 8px', textAlign: 'left', flex: 1 }}
              size="1"
              weight="3"
            >
              Ask me anything
            </Text>
            <Pill variant="success">Experimental</Pill>
          </Flex>
        </S.Item>
      </div>
    </motion.div>
  );
};

export { CommandCenterStatic };
