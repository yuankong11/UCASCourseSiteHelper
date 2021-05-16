build:
	npm --prefix UCASCourseCiteHelperBuilder run build
	cp UCASCourseCiteHelperBuilder/dist/tampermonkey-vue.user.js UCASCourseCiteHelper.js
