import processor_frame from '../../assets/icons/processor_frame.svg';
import memory_frame from '../../assets/icons/memory_frame.svg';
import fast_disk_frame from '../../assets/icons/fast_disk_frame.svg';
import archive_disk_frame from '../../assets/icons/archive_disk_frame.svg';
import ip_frame from '../../assets/icons/ip_frame.svg';
import public_network_frame from '../../assets/icons/public_network_frame.svg';
import router_frame from '../../assets/icons/router_frame.svg';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Input } from '../../components/InputNumber/Input';
import './Form.scss';

export function Form() {

    const [selectedOption, setSelectedOption] = useState<string>('hourly');
    const [processorPrice, setProcessorPrice] = useState<number>(0);
    const [memoryPrice, setMemoryPrice] = useState<number>(0);
    const [fastDiskPrice, setFastDiskPrice] = useState<number>(0);
    const [archiveDiskPrice, setArchiveDiskPrice] = useState<number>(0);
    const [networkPrice, setNetworkPrice] = useState<number>(0);
    const [ipPrice, setIpPrice] = useState<number>(0);
    const [routePrice, setRoutePrice] = useState<number>(3000);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const sum = processorPrice + memoryPrice + fastDiskPrice + archiveDiskPrice + networkPrice + ipPrice + routePrice;
        setTotalPrice(sum);
    }, [processorPrice, memoryPrice, fastDiskPrice, archiveDiskPrice, networkPrice, ipPrice, routePrice]);

    const formatPrice = (price: number) => {
        return price.toLocaleString('ru-RU');
    };

    return (
        <div className='form'>
            <div className='form__container'>
                <div className='container__title'>
                    <h1 className='container__title-text'>Ресурсы вашего облака Virtuozzo PaaS</h1>
                    <div className="container__title-switch">
                        <button
                            className={`container__title-switch-button ${selectedOption === 'hourly' ? 'active' : ''}`}
                            onClick={() => setSelectedOption('hourly')}
                        >
                            в час
                        </button>
                        <button
                            className={`container__title-switch-button ${selectedOption === 'monthly' ? 'active' : ''}`}
                            onClick={() => setSelectedOption('monthly')}
                        >
                            в месяц
                        </button>
                    </div>
                </div>
                <div className='container__input'>
                    <Input 
                        image={processor_frame} 
                        inputText='Ядра процессора' 
                        type='input' status={false} 
                        basicPrice={1900} 
                        priceSpan={selectedOption === 'monthly' ? 'тг за ядро/мес' : 'тг за ядро/день'} 
                        onChange={(value) => setProcessorPrice(value)}
                        selectedOption={selectedOption}
                    />
                    <Input 
                        image={memory_frame} 
                        inputText='Оперативная память, ГБ' 
                        type='input' 
                        status={false} 
                        basicPrice={5200} 
                        priceSpan={selectedOption === 'monthly' ? 'тг за ГБ/мес': 'тг за ГБ/день'} 
                        onChange={(value) => setMemoryPrice(value)}
                        selectedOption={selectedOption}
                    />
                    <Input 
                        image={fast_disk_frame} 
                        inputText='Быстрый диск NVME, ГБ' 
                        type='input' 
                        status={true} 
                        basicPrice={160} 
                        priceSpan={selectedOption === 'monthly' ? 'тг за ГБ/мес' : 'тг за ГБ/день'} 
                        onChange={(value) => setFastDiskPrice(value)}
                        selectedOption={selectedOption}
                    />
                    <Input 
                        image={archive_disk_frame} 
                        inputText='Архивный диск, ГБ' 
                        type='input' 
                        status={true} 
                        basicPrice={10} 
                        priceSpan={selectedOption === 'monthly' ? 'тг за ГБ/мес' : 'тг за ГБ/день'} 
                        onChange={(value) => setArchiveDiskPrice(value)}
                        selectedOption={selectedOption}
                    />
                    <Input 
                        image={public_network_frame} 
                        inputText='Публичная сеть' 
                        type='select' 
                        status={false} 
                        basicPrice={0} 
                        priceSpan={selectedOption === 'monthly' ? 'тг/мес' : 'тг/день'} 
                        onChange={(value) => setNetworkPrice(value)} 
                        options={[
                            { label: 'Не заказывать', value: 0 },
                            { label: 'Заказывать', value: 2000 }
                        ]}
                        selectedOption={selectedOption}
                    />
                    <Input 
                        image={ip_frame} 
                        inputText='Маршрутизируемые IP-адреса' 
                        type='input' 
                        status={true} 
                        basicPrice={1000} 
                        priceSpan={selectedOption === 'monthly' ? 'тг за адрес/мес' : 'тг за адрес/день'} 
                        onChange={(value) => setIpPrice(value)}
                        selectedOption={selectedOption}
                    />
                    <Input 
                        image={router_frame} 
                        inputText='Маршрутизатор' 
                        type='select' 
                        status={true} 
                        basicPrice={3000} 
                        priceSpan={selectedOption === 'monthly' ? 'тг/мес' : 'тг/день'} 
                        onChange={(value) => setRoutePrice(value)}
                        options={[
                            { label: 'Compact — 1 vCPU, 512 MB RAM', value: 3000 },
                            { label: 'Large — 2 vCPU, 1 GB RAM', value: 6000 }
                        ]}
                        selectedOption={selectedOption}
                    />
                </div>
                <div className='container__order'>
                    <button className='container__order-button' onClick={showModal}>Заказать</button>
                    <p className='container__order-sum'>за<span className='container__order-sum span'> {formatPrice(totalPrice)} </span> {selectedOption === 'monthly' ? 'тг/мес' : 'тг/день'}</p>
                </div>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Добавлено в корзину</p>
                </Modal>
            </div>
        </div>
    )
}