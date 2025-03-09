export type MovementTypeId = "1"|"2"|"3"|"4";

export type Movement = {
    main:    Main;
    details: Detail[];
    _method?: 'PUT';
}

export type Main = {
    type_id:         MovementTypeId;
    number:          string;
    date_time:       string;
    subject:         string;
    description:     string;
    observation?:    string;
    id?:             string;
    close?:          string | null;
    support_type_id: string;
    support_number:  string;
    support_date:    string;
    store_uuid?:       string;
}

export type Detail = {
    article_id?:  string;
    close:       string | null;
    id?:          string;
    int_cod:     string;
    warehouse_code: string;
    warehouse_name: string;
    movement_id?: string;
    name:        string;
    photo:       string;
    price:       string;
    quantity:    number;
    status:      number;
    stock_max:   number;
    stock_min:   number;
}
