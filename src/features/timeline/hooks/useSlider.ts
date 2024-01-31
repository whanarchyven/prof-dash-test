import { RefObject, useEffect } from 'react';
import { setScroll } from '@/shared/store/timelineSlice';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';

export const useSlider = (
  sliderRef: RefObject<HTMLDivElement>,
  maxWidth: number
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (slider) {
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        const mutatingValue =
          scrollLeft - walk >= maxWidth - slider.offsetWidth
            ? maxWidth - slider.offsetWidth
            : scrollLeft - walk;
        slider.scrollLeft = mutatingValue;
        dispatch(setScroll(mutatingValue));
      });
    }
  }, []);
};
