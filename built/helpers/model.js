/**
 * Registers a sequelize model
 */
import { sequelize } from '../core/sequelize';
function model({ name, schema, options }) {
    // register a new model
    return sequelize.define(name, schema, options);
}
export default model;
