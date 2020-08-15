<?php
/**
 * Webkul Software
 *
 * @category  Webkul
 * @package   Webkul_FacebookWallPost
 * @author    Webkul
 * @copyright Copyright (c) Webkul Software Private Limited (https://webkul.com)
 * @license   https://store.webkul.com/license.html
 */
namespace Webkul\FacebookWallPost\Block;

use Magento\Store\Model\StoreManagerInterface as Store;
use Magento\Framework\Encryption\EncryptorInterface;
use Magento\Framework\Stdlib\DateTime\DateTime;

class Facebookwallpost extends \Magento\Framework\View\Element\Template
{

    /**
     * @param \Magento\Framework\View\Element\Template\Context $context
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        EncryptorInterface $encryptor,
        \Magento\Framework\HTTP\Client\Curl $curl,
        array $data = []
    ) {
        $this->encryptor = $encryptor;
        $this->curl = $curl;
        parent::__construct($context, $data);
    }

/**
 * generate access token using facebook graph api with oauth endpoint.
 *
 * @return string access token
 */
    private function getvalidAccessToken()
    {
        $appId = $this->getAppId();
        $secret = $this->getSecretKey();
        $url = 'https://graph.facebook.com/oauth/access_token?client_id='
        .$appId.'&client_secret='.$secret.'&grant_type=client_credentials&format=json';
        $options = [
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => ['Content-Type:application/json']
        ];
        $this->curl->setOptions($options);
        $this->curl->get($url);
        $response = $response = json_decode($this->curl->getBody());
        if ($response != null) {
            /*
             * retuns object if error occurs
             */
            return $response;
        } else {
            /*
             * auth end point returns access token in string format so it need to explode
             * @var array
             */
            $accessToken = explode('=', $longaccesstoken);
            if ($accessToken[0] == 'access_token') {
                return $accessToken[1];
            }
        }
        return false;
    }

    /**
     * get facebook id from configuration.
     *
     * @return string
     */
    public function getFacebookId()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/facebookid',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show guest entries from configuration.
     *
     * @return bool
     */
    public function getGuestEntries()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/guestentries',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show comments from configuration.
     *
     * @return bool
     */
    public function getComments()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/comments',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show in same page or new tab from configuration.
     *
     * @return string
     */
    public function getShowInWindow()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/showinwindow',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show number of comments from configuration.
     *
     * @return int
     */
    public function getNumComments()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/numcomments',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get with of the frame from configuration.
     *
     * @return int
     */
    public function getWidth()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/width',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get height of the frame from configuration.
     *
     * @return int
     */
    public function getHeight()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/height',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show media images from configuration.
     *
     * @return bool
     */
    public function getMediaImg()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/mediaimg',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get access token.
     *
     * @return string
     */
    public function getAccessToken()
    {
        return $this->getvalidAccessToken();
    }

    /**
     * get show more button label from configuration.
     *
     * @return string
     */
    public function getSeeMore()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/seemore',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get see less button label from configuration.
     *
     * @return string
     */
    public function getSeeLess()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/seeless',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get charecter limit from configuration.
     *
     * @return int
     */
    public function getCharLen()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/limit',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get delay after see more click from configuration.
     *
     * @return int
     */
    public function getCharSpeed()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/speed',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get enable advanced options from configuration.
     *
     * @return bool
     */
    public function getTheme()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/theme',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show facebook likes from configuration.
     *
     * @return bool
     */
    public function getFbLike()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/fblike',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show facebook like box from configuration.
     *
     * @return bool
     */
    public function getFbLikeBox()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/fblikebox',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get enable advanced options from configuration.
     *
     * @return bool
     */
    public function getShowFaces()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/show_faces',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get header title from configuration.
     *
     * @return string
     */
    public function getHeaderText()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/headertext',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show header from configuration.
     *
     * @return bool
     */
    public function getUpperHeader()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/upperheader',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show facebook logo from configuration.
     *
     * @return bool
     */
    public function getFacebookLogo()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/facebooklogo',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show facebook group url from configuration.
     *
     * @return bool
     */
    public function getGroupUrlOpt()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/groupurlOpt',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show facebook page url from configuration.
     *
     * @return bool
     */
    public function getPageUrlOpt()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/pageurlOpt',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show date from configuration.
     *
     * @return bool
     */
    public function getShowDate()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/showdate',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get group url from configuration.
     *
     * @return string
     */
    public function getGroupUrl()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/groupurl',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get page url from configuration.
     *
     * @return string
     */
    public function getPageUrl()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/pageurl',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get background color from configuration.
     *
     * @return string
     */
    public function getWallBackGroungColor()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/wall_backgroung_color',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get text color from configuration.
     *
     * @return string
     */
    public function getWallDataColor()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/wall_data_color',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get comments background from configuration.
     *
     * @return string
     */
    public function getWallCommentBgColor()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/wall_comment_bgcolor',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get comment text color from configuration.
     *
     * @return string
     */
    public function getWallCommentColor()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/wall_comment_color',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show not found image from configuration.
     *
     * @return bool
     */
    public function getShowAvatar()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/showavatar',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get show moreoptions from configuration.
     *
     * @return bool
     */
    public function getShowMoreOption()
    {
        return $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/showMoreOption',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
    }

    /**
     * get application id from configuration.
     *
     * @return string
     */
    public function getAppId()
    {
        $appId =  $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/appid',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
                return $this->encryptor->decrypt($appId);
    }

    /**
     * get secret key from configuration.
     *
     * @return string
     */
    public function getSecretKey()
    {
        $secretKey = $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/secretkey',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
                return $this->encryptor->decrypt($secretKey);
    }

    /**
     * get facebook id from configuration.
     *
     * @return string
     */
    public function getTestAccountAccessToken()
    {
        $testAccountAccessToken =  $this->_scopeConfig->
                getValue(
                    'facebookwallpost/parameter/testaccountaccesstoken',
                    \Magento\Store\Model\ScopeInterface::SCOPE_STORE
                );
                return $this->encryptor->decrypt($testAccountAccessToken);
    }
}
