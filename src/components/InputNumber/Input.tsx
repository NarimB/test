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
        const newValue = Number(e.target.value);
        setInputValue(newValue);
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

    return (
        <div className="input-number-container">
            <div className="input-number-block">
                <img src={image} alt="input icon" className="input-number-image" />
                <div className="input-number-box">
                    <label className="input-number-label">{inputText}
                        {status === true ? (
                            <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
                                <Tooltip placement="rightBottom" title={'Подсказка...'} arrow={mergedArrow} color='#20A8D8'>
                                    <img src={questionMark_frame} className='input-number-lable-image'></img>
                                </Tooltip>
                            </Flex>
                        ) : 
                            null 
                        }
                    </label>
                    {type === 'input' ? (
                        <div className="input-number-controls">
                            <button className="input-btn decrement" onClick={decrease}>
                                <img src={decrement} alt="decrement icon" />
                            </button>
                            <input type="number" className="input-number" value={inputValue || ''} onChange={handleInputChange}/>
                            <button className="input-btn increment" onClick={increase}>
                                <img src={increment} alt="increment icon" />
                            </button>
                        </div>
                    ) : 
                        <>
                            <select className='form-select' onChange={handleSelectChange}>
                                {options && options.map((option, index) => (
                                    <option key={index} value={option.value} className='form-select-option'>{option.label}</option>
                                ))}
                            </select> 
                            <img src={select_arrow_frame} className='form-select-arrow'></img>
                        </>
                        }
                </div>
            </div>
            <p className="input-number-price-p">
                {type === 'input' ? (
                        <>
                            {selectedOption === 'monthly' ? basicPrice * 30 : basicPrice} <span className="input-number-price-span">{priceSpan}</span>
                        </>
                    ) : (
                        <>
                            {selectedOption === 'monthly' ? selectedOptionPrice * 30 : selectedOptionPrice} <span className="input-number-price-span">{priceSpan}</span>
                        </>
                )}
            </p>
        </div>
    )
};