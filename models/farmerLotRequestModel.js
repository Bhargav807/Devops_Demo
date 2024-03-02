import mongoose from 'mongoose';

const farmerLotRequestSchema = new mongoose.Schema({
    farmer_lot_request_id: {
        type: Number,
        required: true,
        unique: true
    },
    actual_price: Number,
    actual_price_uom: String,
    actual_qty: Number,
    actual_qty_uom: String,
    actual_yield_date: Date,
    available_location_lat: String,
    available_location_lon: String,
    available_lot_indicator: Boolean,
    commodity_id: Number,
    created_at: {
        type: Date,
        required: true
    },
    created_user_id: String,
    expected_price: Number,
    expected_price_uom: String,
    expected_qty: Number,
    expected_qty_uom: String,
    expected_yield_date: Date,
    farmer_agent_id: String,
    farmer_id: String,
    location_desc: String,
    merge_indicator: Boolean,
    net_actual_price: Number,
    net_expected_price: Number,
    notes: String,
    no_of_packages: Number,
    organic: Boolean,
    packaging_type: String,
    parent_lot_indicator: Boolean,
    parent_lot_request_id: Number,
    per_package_qty: Number,
    per_package_uom: String,
    split_indicator: Boolean,
    status: String,
    updated_at: {
        type: Date,
        required: true
    },
    updated_user_id: String,
    variety: String,
    freight_details: String,
    commodity_category_id: Number
});

export default mongoose.model('FarmerLotRequestNewA', farmerLotRequestSchema);

