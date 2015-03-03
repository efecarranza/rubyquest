class Answer < ActiveRecord::Base
  serialize :answers, Array
end
