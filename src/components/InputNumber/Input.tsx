import decrement from '../../assets/icons/decrement.svg';
import increment from '../../assets/icons/increment.svg';
import questionMark_frame from '../../assets/icons/questionMark_frame.svg';
import select_arrow_frame from '../../assets/icons/select_arrow_frame.svg';
import { Flex, Tooltip, TooltipProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import './Input.scss';

interface Props {
    image: string;
    inputText: string;
    type: string;
    status: boolean;
    basicPrice: number;
    priceSpan: string;
    onChange: (value: number) => void;
    options?: { label: string, value: number }[];
    selectedOption: string;
}

export function Input( { image, inputText, type, status, basicPrice, priceSpan, onChange, options, selectedOption }: Props) {

    const [inputValue, setInputValue] = useState<number>(0);
    const [selectedOptionPrice, setSelectedOptionPrice] = useState<number>(basicPrice);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

    const increase = () => {
        setInputValue(prev => prev + 1);
    }

    const decrease = () => {
        if (inputValue > 0) {
            setInputValue(prev => prev - 1);
        }
    }

    useEffect(() => {
        if (type === 'input') {
            if (selectedOption === 'monthly') {
                onChange(inputValue * basicPrice * 30)
            } else {
                onChange(inputValue * basicPrice);
            }
        } else {
            if (selectedOption === 'monthly') {
                onChange(selectedOptionPrice * 30);
            } else {
                onChange(selectedOptionPrice);
            }
        }
    }, [inputValue, selectedOptionPrice, basicPrice, onChange, type, selectedOption]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        setSelectedOptionPrice(selectedValue);
        onChange(selectedValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setInputValue(parseInt(newValue));
        }
    };

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

    const formatPrice = (price: number) => {
        return price.toLocaleString('ru-RU');
    };

    return (
        <div className='selector__container'>
            <img className='selector__container-image' src={image} alt='input icon'></img>
            <div className='selector__container-content'>
                    <fieldset className='selector__container-fieldset'>
                        <legend className='selector__container-legend'>{inputText}
                            {status === true ? (
                                <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
                                    <Tooltip placement="rightBottom" title={'Подсказка...'} arrow={mergedArrow} color='#20A8D8'>
                                        <img src={questionMark_frame} className='selector__container-legend-image'></img>
                                    </Tooltip>
                                </Flex>
                            ) : 
                                null 
                            }
                        </legend>
                        {type === 'input' ? (
                            <div className='selector__container-input-block'>
                                <button className='selector__container-input-decrement' onClick={decrease}>
                                    <img src={decrement} alt='decrement icon'></img>
                                </button>
                                <input 
                                    className='selector__container-input' 
                                    type='number' 
                                    value={inputValue} 
                                    onChange={handleInputChange}
                                    min={0}>
                                </input>
                                <button className='selector__container-input-increment' onClick={increase}>
                                    <img src={increment} alt='increment icon'></img>
                                </button>
                            </div>

                        ) : 
                            <>
                                <select className='selector__container-select' onChange={handleSelectChange}>
                                    {options && options.map((option, index) => (
                                        <option key={index} value={option.value} className='form-select-option'>{option.label}</option>
                                    ))}
                                </select> 
                                <img src={select_arrow_frame} className='selector__container-select-arrow'></img>
                            </>
                        }
                    </fieldset>
                <p className="selector__container-price">
                    {type === 'input' ? (
                            <>
                                {selectedOption === 'monthly' ? formatPrice(basicPrice * 30) : formatPrice(basicPrice)} <span className="selector__container-price-span">{priceSpan}</span>
                            </>
                        ) : (
                            <>
                                {selectedOption === 'monthly' ? formatPrice(selectedOptionPrice * 30) : formatPrice(selectedOptionPrice)} <span className="selector__container-price-span">{priceSpan}</span>
                            </>
                    )}
                </p>
            </div>
        </div>
    )
};