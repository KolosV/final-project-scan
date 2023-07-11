import cardImage1 from '../../assets/img/cards/cardImg1.svg';
import cardImage2 from '../../assets/img/cards/cardImg2.svg';
import cardImage3 from '../../assets/img/cards/cardImg3.svg';

export const cardInfo = [
    {
        img: cardImage1,
        currentTariff: true,
        titlte: 'Beginner',
        subTitle: 'Для небольшого исследования',
        price: 799,
        oldPrice: 1200,
        info: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        includes: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
        color: '#ffb64f',
    },
    {
        img: cardImage2,
        currentTariff: false,
        titlte: 'Pro',
        subTitle: 'Для HR и фрилансеров',
        price: 1299,
        oldPrice: 2600,
        info: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        includes: [
            'Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам',
        ],
        color: '#7CE3E1',
    },
    {
        img: cardImage3,
        currentTariff: false,
        titlte: 'Business',
        subTitle: 'Для корпоративных клиентов',
        price: 2379,
        oldPrice: 3700,
        includes: [
            'Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка',
        ],
        color: '#000',
    },
];
