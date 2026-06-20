import Certificate from './certificate.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Certificate, ['title', 'issuer', 'tags'])

export const getCertificates = controller.getAll
export const getCertificateById = controller.getById
export const createCertificate = controller.create
export const updateCertificate = controller.update
export const deleteCertificate = controller.delete
export const restoreCertificate = controller.restore
