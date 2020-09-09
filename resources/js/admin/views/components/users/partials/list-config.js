const columns = [
    {
        label: 'Name',
        field: 'name',
    },
    {
        label: 'Age',
        field: 'age',
        type: 'number',
    },
    {
        label: 'Created On',
        field: 'createdAt',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM Do yy',
    },
    {
        label: 'Percent',
        field: 'score',
        type: 'percentage',
    },
]

const rows = [
    {name: "John", age: 20, createdAt: '', score: 0.03343},
    {name: "Jane", age: 24, createdAt: '2011-10-31', score: 0.03343},
    {name: "Susan", age: 16, createdAt: '2011-10-30', score: 0.03343},
    {name: "Chris", age: 55, createdAt: '2011-10-11', score: 0.03343},
    {name: "Dan", age: 40, createdAt: '2011-10-21', score: 0.03343},
    {name: "John", age: 20, createdAt: '2011-10-31', score: 0.03343},
]

const filters = [
    {
        type: 'FInput',
        title: 'title',
        options: null
    },
    {
        type: 'FSelect',
        title: 'category',
        options: null
    },
    {
        type: 'FSelect',
        title: 'activate',
        options: [
            {
                value: null,
                text: '',
                disabled: true
            },
            {
                value: 1,
                text: 'active'
            },
            {
                value: 2,
                text: 'deactive'
            }
        ]
    },
    {
        type: 'FDate',
        title: 'category',
        options: null
    }
];

const config = {
    columns,
    rows,
    filters
}

export default config
