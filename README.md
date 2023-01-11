# owlcarousel-scrollbar-plugin
owl carousel scrollbar plugin

setting:
.owlCarousel({
  scrollBar: true,
})

css:
.owl-carousel-scrollWrap {
    margin-top: 20px;
    border-radius: 1px;
    height: 2px;
    width: 100%;
    max-width: calc(1170px + 1.5rem);
    border-bottom: 0.5px solid #878787;
    background: transparent;
    box-shadow: inset 0 0 10px -9px rgba(30, 30, 30, .4);
    position: relative;
}

.owl-carousel-scrollWrap .owl-carousel-scrollBar {
    height: 2px;
    border-radius: 2px;
    width: 30%;
    display: inline-block;
    background: #E31C40;
    position: absolute;
    top: 1px;
    left: -1px;
    transition: .4s;
}
