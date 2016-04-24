
 // API Routes
 
  var Controllers = require('../controllers'); 
  
  module.exports = function(app, auth) {
    

  	app.get('/api/common/:slug', Controllers.CommonCtrl.findBySlug);


  	app.post('/api/contact/sendemail', Controllers.EmailCtrl.send);


	// User Routes  
	//app.post('/api/users/create', Controllers.UserCtrl.create);
    app.post('/api/users/login', Controllers.UserCtrl.login); 
    app.get('/api/users/me', auth.requiresLogin, Controllers.UserCtrl.me);
	app.put('/api/users/update/:id', auth.requiresLogin, Controllers.UserCtrl.update);
	
	//Product Category Routes
	app.get('/api/category/list', Controllers.CategoryCtrl.list);
	app.get('/api/category/parent-cat-list', Controllers.CategoryCtrl.parentCatList);
	app.get('/api/category/parent-product-cat-list/:type', Controllers.CategoryCtrl.parentProductCatList);
	app.get('/api/category/parent-blog-cat-list/:type', Controllers.CategoryCtrl.parentBlogCatList);
	app.get('/api/category/sub-cat-list/:id', Controllers.CategoryCtrl.subCatList);

	app.get('/api/category/cat-list-by-type/:type', Controllers.CategoryCtrl.categoryListByType);


	app.get('/api/category/detail/:slug', Controllers.CategoryCtrl.detail);
	app.post('/api/category/create', auth.requiresLogin, Controllers.CategoryCtrl.create);
	app.put('/api/category/update/:id', auth.requiresLogin, Controllers.CategoryCtrl.update);
    app.delete('/api/category/delete/:id', auth.requiresLogin, Controllers.CategoryCtrl.delete);
	
	
	// Product Routes
	app.get('/api/product/list', Controllers.ProductCtrl.list);
	app.get('/api/product/detail/:slug', Controllers.ProductCtrl.detail);
	app.get('/api/product/listbycatslug/:slug', Controllers.ProductCtrl.detailByCategorySlug);
	app.get('/api/product/list-by-tag/:tag', Controllers.ProductCtrl.listByTag);	
	app.get('/api/product/listbycat/:categoryid', Controllers.ProductCtrl.listbycategory);
	
	app.post('/api/product/create', auth.requiresLogin, Controllers.ProductCtrl.create);
	app.post('/api/product/uploadimage', auth.requiresLogin, Controllers.ProductCtrl.uploadImage);
	app.put('/api/product/update/:id', auth.requiresLogin, Controllers.ProductCtrl.update);
    app.delete('/api/product/delete/:id', auth.requiresLogin, Controllers.ProductCtrl.delete);
	
	
	// Tag Routes
	app.get('/api/tag/list', Controllers.TagCtrl.list);
	app.get('/api/tag/detail/:tag', Controllers.TagCtrl.detail);
	app.post('/api/tag/create', auth.requiresLogin, Controllers.TagCtrl.create);
	app.put('/api/tag/update/:id', auth.requiresLogin, Controllers.TagCtrl.update);
    app.delete('/api/tag/delete/:id', auth.requiresLogin, Controllers.TagCtrl.delete);
	

    // Product Routes
	app.get('/api/blog/list', Controllers.BlogCtrl.list);
	app.get('/api/blog/detail/:slug', Controllers.BlogCtrl.detail);
	app.get('/api/blog/listbycatslug/:slug', Controllers.BlogCtrl.detailByCategorySlug);
	app.get('/api/blog/list-by-tag/:tag', Controllers.BlogCtrl.listByTag);	
	app.get('/api/blog/listbycat/:categoryid', Controllers.BlogCtrl.listbycategory);
	app.post('/api/blog/create', auth.requiresLogin, Controllers.BlogCtrl.create);
	app.put('/api/blog/update/:id',  auth.requiresLogin, Controllers.BlogCtrl.update);
    app.delete('/api/blog/delete/:id', auth.requiresLogin, Controllers.BlogCtrl.delete);
	


    // Page Routes
	app.get('/api/page/list', Controllers.PageCtrl.list);
	app.get('/api/page/detail/:slug', Controllers.PageCtrl.detail);
	app.post('/api/page/create', auth.requiresLogin, Controllers.PageCtrl.create);
	app.put('/api/page/update/:id', auth.requiresLogin, Controllers.PageCtrl.update);
    app.delete('/api/page/delete/:id', auth.requiresLogin, Controllers.PageCtrl.delete);
	
    // Tag Routes
	app.get('/api/setting/list', Controllers.SettingCtrl.list);
	app.get('/api/setting/detail/:id', Controllers.SettingCtrl.detail);
	app.post('/api/setting/create', auth.requiresLogin, Controllers.SettingCtrl.create);
	app.put('/api/setting/update/:id', auth.requiresLogin, Controllers.SettingCtrl.update);
    app.delete('/api/setting/delete/:id', auth.requiresLogin, Controllers.SettingCtrl.delete);
	


  }
