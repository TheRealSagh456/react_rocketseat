/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ReceiptDownloadsController = () => import('../app/controllers/receipt_downloads_controller.js')
const ReceiptsController = () => import('../app/controllers/receipts_controller.js')
const RefundsController = () => import('../app/controllers/refunds_controller.js')

import router from '@adonisjs/core/services/router'

router.resource('refunds', RefundsController).only(['index', 'store', 'show', 'destroy'])
router.resource('receipts', ReceiptsController).only(['store', 'show', 'destroy'])
router.get('receipts/download/:id', [ReceiptDownloadsController])
