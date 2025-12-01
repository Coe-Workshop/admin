### PARE BUG OVERVIEW

- @NAVbar.module.scss

# BUG

น่าจะเกิดจากความพยายามในการเขียน Sidebar ให้ **fixed ติดกับหน้าจอตลอด** ในรูปแบบที่หน้าจอระดับ pc มีขนาดที่ยาวมากๆ ตอน ในระดับที่ resposive pc ขึ้นไป

```scss
.navbar {
  width: 260px;
  height: 100vh;
  position: Fixed; //ปัญหา
  background: $sub-50;
  padding: 25px 18px;
  left: 0;
  top: 0;
  flex-direction: column;
  justify-content: space-between;
  @include respond-to-max(md) {
    background: $sub-0;
    width: 100vw;
    height: 80px;
  }
}
```

# ปัญหาที่ตามมา

fixed position component **มันบังกการแสดงผลของ children** ต้องมีการ handle fixed position ตัวนี้ทุก children หรือให้ดีหน่อยคือจัดการกับ container ของ children ในพื้นที่ที่ไม่ถูกคิด

```scss
.landing {
  padding: 0 1rem;
  margin-left: 260px;
  min-height: 100vh;
  @include respond-to-max(sm) {
    margin-left: 0;
  }
}
```

# SOLUTION

**_Hint_**
container เลื่อนไม่ได้
แต่ children เลื่อนได้

```html
<!-- ยาวแค่หน้าจอ ห้ามเลื่อน -->
<div className="flex flex-col md:flex-row md:h-100vh  overflow-hidden">
  <!--ตัวลูกอนุญาตให้เลื่อนได้-->
  <div className="overflow-scroll-y">{children}</div>
</div>
```
