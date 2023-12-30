import { BLOCKS, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => <span className="font-bold">{children}</span>;

const Text = ({ children }) => <p className="text-left">{children}</p>;
export const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};
