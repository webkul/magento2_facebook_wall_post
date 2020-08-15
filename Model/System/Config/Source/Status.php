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

namespace Webkul\FacebookWallPost\Model\System\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;

/**
 * Class Status to get in configuration section.
 */
class Status implements OptionSourceInterface
{
  
    /**
     * Get options
     *
     * @return array
     */
    public function toOptionArray()
    {
        $options = [];
            $options[] = [
                'label' => __('Same Window'),
                'value' => "samewindow",
            ];
            $options[] = [
                'label' => __('New Tab'),
                'value' => "newtab",
            ];
            return $options;
    }
}
