import menu from '../../assets/icons/menu.svg';
import blue_question_mark from '../../assets/icons/blue_question_mark.svg';
import question_mark from '../../assets/icons/question_mark.svg';
import theme from '../../assets/icons/theme.svg';
import language from '../../assets/icons/language.svg';
import pin from '../../assets/icons/pin.svg';
import { useMemo, useState } from 'react';
import { Flex, Tooltip, TooltipProps } from 'antd';
import './Sidebar.scss';

export function Sidebar() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

    const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);

    return (
        <>
            <div className="sidebar">
                <img className='menu' src={menu}></img>    
                <Flex align="center" vertical>
                    <Tooltip placement="rightTop" title={'Подсказка...'} arrow={mergedArrow} color='#20A8D8'>
                        <img className='blue_question_mark' src={blue_question_mark}></img>
                    </Tooltip>
                </Flex>
                <Flex align="center" vertical>
                    <Tooltip placement="rightTop" title={'Подсказка...'} arrow={mergedArrow} color='#2A2C36'>
                        <img className='question_mark' src={question_mark}></img>
                    </Tooltip>
                </Flex>
                <img src={theme} className='theme'></img>
                <img src={language} className='language'></img>
                <img src={pin} className='pin'></img>
            </div>
        </>
    )
}