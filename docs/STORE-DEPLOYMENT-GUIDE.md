# Hướng Dẫn Deploy Extension Lên Chrome/Edge Store

Tài liệu hướng dẫn chi tiết cách đưa **Dataverse Column Namer** extension lên Chrome Web Store và Microsoft Edge Add-ons.

---

## 📋 Chuẩn Bị Trước Khi Deploy

### 1. Kiểm Tra Extension

- [ ] Chạy `/deploy` workflow để tạo package production (`IS_DEBUG = false`)
- [ ] Test kỹ extension trong Chrome/Edge developer mode
- [ ] Verify tất cả tính năng hoạt động đúng
- [ ] Đảm bảo không có console errors
- [ ] Test trên nhiều môi trường Dataverse khác nhau

### 2. Chuẩn Bị Tài Liệu & Assets

#### Screenshots (Bắt buộc)
- **Kích thước:** 1280x800 hoặc 640x400 pixels
- **Số lượng:** Tối thiểu 1, khuyến nghị 3-5 screenshots
- **Nội dung cần chụp:**
  - Extension popup với cấu hình
  - New Column panel với schema name được tạo tự động
  - Suffix configuration panel
  - Environment detection đang hoạt động

#### Promotional Images (Tùy chọn nhưng khuyến nghị)
- **Small tile:** 440x280 pixels
- **Large tile:** 920x680 pixels  
- **Marquee:** 1400x560 pixels

#### Description Text
Sử dụng description từ `manifest.json`:
```
Automatically generates schema names for Dataverse columns following configurable naming conventions. Save time and ensure consistency when creating columns in PowerApps.
```

### 3. Chuẩn Bị Thông Tin Pháp Lý

- **Privacy Policy URL:** (Nếu cần - extension không thu thập data nhưng store có thể yêu cầu)
- **Support Email/Website:** phuocle.net hoặc GitHub issues page

---

## 🟦 Deploy Lên Chrome Web Store

### Bước 1: Đăng Ký Chrome Web Store Developer

1. Truy cập [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Đăng nhập bằng Google Account
3. Đồng ý với Terms of Service
4. Trả **phí đăng ký một lần $5 USD** (bắt buộc)
5. Chờ payment được xác nhận (~5-10 phút)

### Bước 2: Upload Extension

1. Click **"New Item"** button
2. Upload file `DataverseColumnNamer.zip` từ thư mục `deploy/`
3. Chờ hệ thống analyze package (~30 giây)
4. Nếu có lỗi, fix và upload lại

### Bước 3: Điền Thông Tin Extension

#### Store Listing Tab

**Product Details:**
- **Name:** Dataverse Column Namer
- **Summary:** (max 132 chars)
  ```
  Auto-generates schema names for Dataverse columns with configurable naming conventions and type-based suffixes
  ```
- **Description:** (max 16,000 chars)
  ```markdown
  # Dataverse Column Namer
  
  Automatically generates schema names for Dataverse columns in Microsoft PowerApps, following configurable naming conventions.
  
  ## Features
  - 🎯 Auto-generate schema names from display names
  - 🔧 5 naming conventions (underscore_lowercase, pascalCase, camelCase, etc.)
  - 📝 Type-based suffixes (e.g., _lookup, _choice, _currency)
  - 🌍 Environment detection & activation
  - 💾 Import/Export configuration
  - ⚡ Real-time schema name updates
  
  ## How to Use
  1. Install the extension
  2. Navigate to make.powerapps.com
  3. Configure your environment and naming convention
  4. Create a new column
  5. Type the display name - schema name is auto-generated!
  
  ## Privacy
  This extension does not collect any personal data. All settings are stored locally in your browser.
  
  ## Support
  For issues or feature requests, visit: https://github.com/phuocle/dataverse-column-namer
  ```

- **Category:** Developer Tools
- **Language:** English (United States)

**Graphic Assets:**
- Upload icon (128x128, 48x48, 16x16) từ `src/icons/`
- Upload screenshots (tối thiểu 1, khuyến nghị 3-5)
- Upload promotional tiles (optional)

**Additional Fields:**
- **Official URL:** `https://github.com/phuocle/dataverse-column-namer`
- **Support URL:** `https://github.com/phuocle/dataverse-column-namer/issues`

#### Privacy Tab

- **Single Purpose:** ✅ Tick
  - Description: "Automatically generates schema names for Dataverse columns"
- **Permission Justification:**
  - `activeTab`: "Required to detect the current PowerApps environment"
  - `scripting`: "Required to inject column naming logic into PowerApps"
  - `storage`: "Required to save user configuration and naming preferences"
- **Host Permissions:**
  - `https://make.powerapps.com/*`: "Extension only works on PowerApps maker portal"

- **Remote Code:** No ❌
- **Data Usage:** Không thu thập data

#### Pricing & Distribution Tab

- **Pricing:** Free
- **Distribution:**
  - ✅ Public (recommended for open source)
  - hoặc Unlisted (nếu chỉ muốn share bằng link)
- **Countries:** All countries (mặc định)

### Bước 4: Submit For Review

1. Click **"Submit for review"**
2. Review tất cả thông tin
3. Confirm submission
4. Chờ Google review (~1-3 ngày làm việc)

### Bước 5: Theo Dõi Review Process

- Check email thường xuyên
- Xem status tại Developer Dashboard
- Nếu bị reject, đọc kỹ feedback và fix

**Lý do thường bị reject:**
- Missing privacy policy (nếu extension request nhiều permissions)
- Icon/screenshots không đúng kích thước
- Description không rõ ràng về single purpose
- Manifest permissions không được justify đầy đủ

---

## 🟩 Deploy Lên Microsoft Edge Add-ons

### Bước 1: Đăng Ký Edge Partner Center

1. Truy cập [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge)
2. Đăng nhập bằng Microsoft Account
3. Enroll as Microsoft Edge Developer
4. Đồng ý với agreements
5. **MIỄN PHÍ** - Microsoft không tính phí đăng ký

### Bước 2: Create New Submission

1. Vào **Extensions** > **New Product**
2. Click **Manifest V3 Extension**
3. Upload `DataverseColumnNamer.zip`
4. Chờ validation (~1 phút)

### Bước 3: Điền Product Details

#### Properties

- **Category:** Developer Tools
- **Privacy Policy URL:** (Optional nếu không thu thập data)
  - Hoặc để trống và tick "This product does not collect user data"
- **Support Contact:** Email hoặc support URL

#### Listing

**Product Listing Details:**
- **Name:** Dataverse Column Namer
- **Short Description:** (max 132 chars)
  ```
  Auto-generates schema names for Dataverse columns with configurable conventions and type suffixes
  ```
- **Long Description:** (max 10,000 chars) - tương tự Chrome
- **Languages:** English

**Screenshots:**
- Upload 1-10 screenshots
- Kích thước: 1280x800 hoặc 640x400
- Format: PNG, JPG

**Store Logos:**
- Upload icons từ `src/icons/`

**Additional Info:**
- **Publisher Display Name:** PhuocLe
- **Support Website:** `https://github.com/phuocle/dataverse-column-namer`

#### Availability

- **Markets:** All available markets
- **Pricing:** Free
- **Visibility:**
  - Public (recommended)
  - hoặc Hidden (share via direct link only)

### Bước 4: Submit Extension

1. Review tất cả thông tin
2. Click **"Publish"**
3. Chờ Microsoft review (~1-5 ngày làm việc)

### Bước 5: Monitor Status

- Check Partner Center dashboard
- Check email notifications
- Edge thường review nhanh hơn Chrome

---

## 📊 So Sánh Chrome vs Edge Store

| Feature | Chrome Web Store | Edge Add-ons |
|---------|------------------|--------------|
| Phí đăng ký | $5 USD (1 lần) | Miễn phí |
| Thời gian review | 1-3 ngày | 1-5 ngày |
| Tỉ lệ approve | ~80% (strict hơn) | ~90% (dễ hơn) |
| User base | Lớn hơn nhiều | Nhỏ hơn |
| Auto-update | ✅ | ✅ |
| Analytics | Đầy đủ | Đầy đủ |

**Khuyến nghị:** Deploy cả 2 stores để tiếp cận nhiều người dùng nhất.

---

## 🔄 Update Extension (Sau Khi Đã Publish)

### Chuẩn Bị Update

1. Tăng version trong `manifest.json`:
   ```json
   "version": "1.0.1"
   ```

2. Chạy `/deploy` để tạo package mới

3. Tạo changelog để ghi nhớ thay đổi

### Update Chrome Web Store

1. Vào [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click vào extension
3. Click **"Package"** tab
4. Click **"Upload Updated Package"**
5. Upload file ZIP mới
6. Update description nếu cần (ở Store Listing tab)
7. Click **"Submit for review"**
8. Chờ review (thường nhanh hơn lần đầu: ~1 ngày)

### Update Edge Add-ons

1. Vào [Partner Center](https://partner.microsoft.com/dashboard/microsoftedge)
2. Click vào extension
3. Click **"Update"**
4. Upload package mới
5. Update listing info nếu cần
6. Click **"Publish"**
7. Chờ review (~1-2 ngày)

---

## 🚨 Troubleshooting

### Chrome Web Store Issues

**"Package is invalid"**
- Kiểm tra `manifest.json` format
- Đảm bảo tất cả files được reference tồn tại
- Icon phải có đúng kích thước (16, 48, 128)

**"Permissions are too broad"**
- Justify từng permission trong Privacy tab
- Chỉ request permissions thực sự cần thiết
- Giải thích rõ ràng mục đích sử dụng

**"Single purpose violation"**
- Mô tả rõ single purpose
- Đảm bảo extension chỉ làm 1 việc chính
- Không bundle nhiều features không liên quan

**"Deceptive installation tactics"**
- Không dùng keywords spam trong description
- Screenshots phải chính xác
- Không mislead người dùng

### Edge Add-ons Issues

**"Manifest validation failed"**
- Validate manifest tại: https://github.com/validator/validator
- Check JSON syntax
- Verify Manifest V3 compliance

**"Icons missing"**
- Đảm bảo có đủ 3 sizes: 16, 48, 128
- Format: PNG (recommended) hoặc JPG
- Trong folder `icons/`

---

## ✅ Checklist Trước Khi Submit

### Technical
- [ ] `IS_DEBUG = false` trong production build
- [ ] Version number hợp lệ trong `manifest.json`
- [ ] Tất cả icons có đủ sizes (16, 48, 128)
- [ ] Extension test pass trên Chrome và Edge
- [ ] Không có console errors
- [ ] Package size < 100MB

### Content
- [ ] Screenshots rõ ràng, chất lượng cao
- [ ] Description mô tả đầy đủ features
- [ ] Single purpose rõ ràng
- [ ] Permissions được justify
- [ ] Support URL hoạt động

### Legal
- [ ] Extension name không vi phạm trademark
- [ ] Privacy policy (nếu cần)
- [ ] Terms of service (nếu cần)

---

## 📈 Sau Khi Publish

### Marketing

1. **Update README.md** với Chrome/Edge store links:
   ```markdown
   ## Installation
   
   ### Chrome Web Store
   [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
   
   ### Edge Add-ons
   [Install from Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/YOUR_EXTENSION_ID)
   ```

2. **Announce trên social media:**
   - LinkedIn (Dataverse/PowerApps community)
   - Twitter/X với hashtags: #PowerApps #Dataverse
   - PowerApps community forums

3. **Tạo demo video** và upload lên YouTube

### Monitor Performance

- Track installations qua store dashboards
- Monitor reviews/ratings
- Respond to user feedback
- Track GitHub issues

### Gather Feedback

- Encourage users để lại reviews
- Fix bugs nhanh chóng
- Update extension dựa trên feedback
- Maintain active communication với users

---

## 🔗 Useful Links

### Chrome Web Store
- Developer Dashboard: https://chrome.google.com/webstore/devconsole
- Documentation: https://developer.chrome.com/docs/webstore/
- Program Policies: https://developer.chrome.com/docs/webstore/program-policies/

### Microsoft Edge Add-ons
- Partner Center: https://partner.microsoft.com/dashboard/microsoftedge
- Documentation: https://docs.microsoft.com/microsoft-edge/extensions-chromium/
- Policies: https://docs.microsoft.com/microsoft-edge/extensions-chromium/store-policies/

### Tools
- Manifest Validator: https://github.com/validator/validator
- Icon Generator: https://www.iconsgenerator.com/
- Screenshot Tools: ShareX, Snagit

---

**Good luck with your extension deployment! 🚀**

*Nếu gặp khó khăn, tạo issue tại [GitHub repo](https://github.com/phuocle/dataverse-column-namer/issues)*
