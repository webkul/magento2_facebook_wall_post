# Installation

Magento2 Facebook Wall Post module installation is very easy, please follow the steps for installation-

1. Unzip the respective extension zip and create Webkul(vendor) and FacebookWallPost(module) name folder inside your magento/app/code/ directory and then move all module's files into magento root directory Magento2/app/code/Webkul/FacebookWallPost/ folder.

or

# Install with Composer as you go

Specify the version of the module you need, and go.
<pre>
    <code>composer require webkul/magento2_facebook_wall_post</code>
</pre>

Run Following Command via terminal
-----------------------------------
<pre>
    <code>
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
    </code>
</pre>

2. Flush the cache and reindex all.

now module is properly installed

# User Guide --

For Magento2 FacebookWallPost module's working process follow user guide - http://webkul.com/blog/facebook-wall-post-magento2 also check other magento 2 modules https://store.webkul.com/Magento-2.html
